import React from 'react'
import { ListGroup } from '@/Components/list-group'
import { ListItem } from '@/Components/list-group/list-item'
import { Account, AccountGroup } from '@/types/api'
import { capitalize } from '@/utils'
import { AddAccount } from '../add-account'
import { ACCOUNT_GROUPS, GET_All_ACCOUNTS_API } from '../constants'
import useRequest from '@/lib/swr-config'
import { Skeleton } from '@/Components/ui/skeleton'

const displaySkeletonLoader = () => (<div>
  <Skeleton className="h-[24px] w-[150px] rounded-xl" />
  <Skeleton className="mt-2 h-[96px] w-full rounded-xl" />
</div>);

export const AccountGroups = () => {

  const { data, error, isValidating } = useRequest({
    url: GET_All_ACCOUNTS_API,
    method: "GET"
  });
  console.log("🚀 ~ AccountGroups ~ data:", data)

  if (isValidating) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {displaySkeletonLoader()}
        {displaySkeletonLoader()}
        {displaySkeletonLoader()}
        {displaySkeletonLoader()}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {
        ACCOUNT_GROUPS.map(({ id, label, key }) => {
          /** Cash accounts are hidden for now */
          if (key === 'CASH') return null;

          return (
            <ListGroup key={id} title={capitalize(label)}>
              {data.map((acc: Account) => {
                if (key === acc.group) {
                  return (
                    <ListItem
                      label={acc.name}
                      rightElement={<p className="text-sm">{`$${acc.balance}`}</p>}
                    />
                  )
                } else {
                  return <p className="p-3 text-sm text-muted-foreground italic">No accounts found</p>
                }
              })}
              <AddAccount group={key as unknown as AccountGroup} />
            </ListGroup>
          )
        })
      }
    </div>
  )
}
