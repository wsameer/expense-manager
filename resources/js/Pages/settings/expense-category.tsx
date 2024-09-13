import React from 'react'
import { Button } from '@/Components/ui/button'
import { PageLayout } from '@/layouts'
import { SETTINGS_ROUTE } from '@/router/routes'

export const ExpenseCategoryRoute = () => {
  return (
    <PageLayout
      title='Expense Categories'
      showHeader={true}
      backUrl={SETTINGS_ROUTE}
      rightElement={
        <div className="d-flex">
          <Button>Add</Button>
        </div>
      }>

    </PageLayout>
  )
}
