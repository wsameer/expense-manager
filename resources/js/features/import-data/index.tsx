import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ListItem } from '@/Components/list-group/list-item';
import { Button } from '@/Components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/Components/ui/drawer';
import { Input } from '@/Components/ui/input';
import { toast, useResponsive } from '@/hooks';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { parseAndValidateCSV, Transaction } from './utils/csvParser';
import { useCreateTransaction } from '../add-transaction/api/create-transaction';
import { cleanString, getFormattedDateTime } from '@/utils';
import { useExpenseCategories } from '../expense-category/api/use-expense-categories';
import { useAccounts } from '../accounts/api/get-accounts';
import { TransactionType } from '@/types';
import { useIncomeCategories } from '../income-category/api/use-categories';
import { Subcategory } from '../expense-category/types';


const csvFileSchema = z.object({
  file: z
    .instanceof(File, {
      message: 'Please select a file',
    })
    .refine(
      (file) => file.type === 'text/csv' || file.name.endsWith('.csv'),
      'File must be a CSV',
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB limit
      'File size must be less than 5MB',
    ),
});

type CSVFormData = z.infer<typeof csvFileSchema>;

export const ImportDataDialog = () => {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<{ success: number; failed: number }>({
    success: 0,
    failed: 0,
  });
  const [failedRows, setFailedRows] = useState<
    { row: number; error: string }[]
  >([]);

  const { isDesktop } = useResponsive();
  const { allAccounts } = useAccounts();
  const { createTransaction } = useCreateTransaction();
  const { expenseCategories } = useExpenseCategories();
  const { incomeCategories } = useIncomeCategories();

  const { t } = useTranslation('settings');

  const form = useForm<CSVFormData>({
    resolver: zodResolver(csvFileSchema),
  });


  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    toast({
      title: 'Upload failed',
      description: errorMessage,
      variant: 'destructive',
    });
    setIsUploading(false);
    setParseProgress(0);
    setUploadProgress(0);
  };

  const getSubCategoryId = (transaction: Transaction) => {
    const category = expenseCategories?.find(expense => cleanString(expense.name) === cleanString(transaction.Category));
    const subcategory = category?.subcategories?.find((subC: Subcategory) => cleanString(subC.name) === cleanString(transaction.Subcategory));
    return subcategory?.id;
  };

  const postTransaction = async (transaction: Transaction) => {
    let transactionData = null;

    switch (transaction.Type) {
      case "bank_to_bank":
        transactionData = {
          // Format: YYYY-MM-DD HH:MM:SS
          date: getFormattedDateTime(transaction.Period),
          type: TransactionType.TRANSFER,
          amount: transaction.Amount,
          fromAccountId: allAccounts?.find(account => cleanString(account.name) === cleanString(transaction.FromAccount))?.id,
          toAccountId: allAccounts?.find(account => cleanString(account.name) === cleanString(transaction.ToAccount))?.id,
          note: transaction.Note
        };
        break;

      case "expense":
        transactionData = {
          // Format: YYYY-MM-DD HH:MM:SS
          date: getFormattedDateTime(transaction.Period),
          type: TransactionType.EXPENSE,
          amount: transaction.Amount,
          fromAccountId: allAccounts?.find(account => cleanString(account.name) === cleanString(transaction.FromAccount))?.id,
          expenseCategoryId: expenseCategories?.find(expense => cleanString(expense.name) === cleanString(transaction.Category))?.id,
          expenseSubcategoryId: getSubCategoryId(transaction),
          note: transaction.Note
        };
        break;

      case "income":
        transactionData = {
          // Format: YYYY-MM-DD HH:MM:SS
          date: getFormattedDateTime(transaction.Period),
          type: TransactionType.TRANSFER,
          amount: transaction.Amount,
          incomeCategoryId: incomeCategories?.find(income => income.name === cleanString(transaction.Category))?.id,
          fromAccountId: allAccounts?.find(account => cleanString(account.name) === cleanString(transaction.FromAccount))?.id,
          note: transaction.Note
        };
        break;

      default:
        break;
    }

    console.log("🚀 ~ postTransaction ~ transactionData:", transactionData);

    // const response = await createTransaction(transactionData as any);
    // console.log("🚀 ~ postTransaction ~ response:", response)

  }

  const onSubmit = async (data: CSVFormData) => {
    if (!data.file) return;

    setIsUploading(true);
    setParseProgress(0);
    setUploadProgress(0);
    setResults({ success: 0, failed: 0 });
    setFailedRows([]);

    try {
      const fileReader = new FileReader();
      fileReader.onprogress = (event) => {
        if (event.lengthComputable) {
          setParseProgress((event.loaded / event.total) * 100);
        }

        fileReader.onload = async () => {
          try {
            const { validTransactions, failedRows } = await parseAndValidateCSV(
              data.file,
            );

            // console.log("🚀 ~ fileReader.onload= ~ failedRows:", failedRows)
            // console.log("🚀 ~ fileReader.onload= ~ validTransactions:", validTransactions)

            setFailedRows(failedRows);
            setResults((prev) => ({ ...prev, failed: failedRows.length }));

            const totalTransactions = validTransactions.length;

            for (let i = 0; i < totalTransactions; i++) {
              try {
                await postTransaction(validTransactions[i])
                setResults(prev => ({ ...prev, success: prev.success + 1 }))
              } catch (error) {
                setResults(prev => ({ ...prev, failed: prev.failed + 1 }))
                setFailedRows(prev => [...prev, { row: i + 2, error: 'API error' }])
              }
              setUploadProgress(((i + 1) / totalTransactions) * 100)
            }

            toast({
              title: "Upload complete",
              description: `Successfully uploaded ${results.success} transactions. ${results.failed} failed.`,
            });
          } catch (error) {
            handleError(error);
          }
        };
      };
      fileReader.readAsText(data.file);
    } catch (error) {
      handleError(error);
    } finally {
      setIsUploading(false);
    }
  };

  const renderForm = () => (
    <div className="grid gap-2 px-4 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="csv-upload">{t('data.csv-file')}</FormLabel>
                <FormControl>
                  <Input
                    id="csv-upload"
                    accept=".csv"
                    type="file"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        form.setValue('file', file);
                        setFailedRows([]);
                        setResults({ success: 0, failed: 0 });
                      }
                    }}
                  />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
          <Button
            className="w-full mt-4"
            type="submit"
            variant="default"
            disabled={isUploading}
          >
            {isUploading && <Loader2 className="animate-spin" />}
            {isUploading ? t('uploading') : t('submit')}
          </Button>
        </form>
      </Form>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <ListItem
            icon={
              <FileUp className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
            }
            label={t('import-from-csv')}
            rightElement={undefined}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('data.upload-csv-file')}</DialogTitle>
            <DialogDescription>{t('data.upload-csv-hint')}</DialogDescription>
          </DialogHeader>
          {renderForm()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <ListItem
          icon={<FileUp className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />}
          label={t('import-from-csv')}
          rightElement={undefined}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{t('data.upload-csv-file')}</DrawerTitle>
          <DrawerDescription>{t('data.upload-csv-hint')}</DrawerDescription>
        </DrawerHeader>
        {renderForm()}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant="destructive"
              onClick={() => form.reset()}
              disabled={isUploading}
            >
              {t('data.cancel')}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
