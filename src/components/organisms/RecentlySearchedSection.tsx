import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useState, useCallback } from 'react'
import { useRecentlySearched, useUpdateRecentlySearchedPinned } from 'hooks/planTrip'
import { Coord } from 'types'
import { RecentlySearchedCard } from 'components/molecules'

type RecentlySearchedSectionProps = {
  extraWrapperClasses?: string
}

export const RecentlySearchedSection = ({ extraWrapperClasses = '' }: RecentlySearchedSectionProps) => {
  const { data: session } = useSession()
  const { data: recentlySearchedTrips, refetch } = useRecentlySearched()
  const [limit, setLimit] = useState<number | null>(4)

  const { mutate: pinTrip } = useUpdateRecentlySearchedPinned()

  const onPin = useCallback(
    (from: Coord & { name: string }, to: Coord & { name: string }) => {
      pinTrip({ userEmail: session?.user?.email ?? '', from, to }, { onSuccess: () => refetch() })
    },
    [session]
  )

  const onShowMore = useCallback(() => {
    setLimit(null)
  }, [])

  const trips = recentlySearchedTrips?.sort((a, b) => (a.pinned ? -1 : b.pinned ? 1 : 0)) ?? []

  return (
    <div className={clsx(extraWrapperClasses, !limit && 'h-96 overflow-y-auto')}>
      <div className="grid grid-cols-2 gap-4">
        {(limit ? trips.slice(0, 4) : trips).map((recentlySearched) => (
          <RecentlySearchedCard {...recentlySearched} onPin={onPin} />
        ))}
      </div>
      {recentlySearchedTrips && recentlySearchedTrips.length > 4 && limit && (
        <button
          onClick={onShowMore}
          className="text-sm mt-3 py-1 border border-lighterblue w-full shadow-md rounded-lg hover:bg-lighterblue/50 hover:border-lighterblue"
        >
          Show more
        </button>
      )}
    </div>
  )
}
