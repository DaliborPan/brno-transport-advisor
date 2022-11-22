import { useMemo } from 'react'
import { Calendar, Home } from 'react-feather'
import { HomeDayCard } from '../components/molecules'
import { useBrnoBikeAccidents } from '../hooks/accidents'
import { useAuth } from '../hooks/auth'
import { usePrecipitation, useTemperature } from '../hooks/weather'

const HomeModule: React.FC = () => {
  const { isLoading, user } = useAuth()

  // TODO: To be replaced with getStaticProps + revalidate
  const { data: precipitation } = usePrecipitation()
  const { data: temp } = useTemperature()
  const { data: accidents } = useBrnoBikeAccidents()

  const { yesterdayAccidents, todayAccidents, tomorrowAccidents } = useMemo(() => {
    if (!accidents) return { yesterdayAccidents: null, todayAccidents: null, tomorrowAccidents: null }

    const now = new Date()
    return {
      yesterdayAccidents: accidents.filter(
        ({ attributes: { den, mesic, rok } }) =>
          den === now.getDate() - 1 && mesic === now.getMonth() && rok === now.getFullYear()
      ),
      todayAccidents: accidents.filter(
        ({ attributes: { den, mesic, rok } }) =>
          den === now.getDate() && mesic === now.getMonth() && rok === now.getFullYear()
      ),
      tomorrowAccidents: accidents.filter(
        ({ attributes: { den, mesic, rok } }) =>
          den === now.getDate() + 1 && mesic === now.getMonth() && rok === now.getFullYear()
      )
    }
  }, [accidents])

  const { yesterday, today, tomorrow } = useMemo(() => {
    if (!precipitation || !temp)
      return {
        yesterday: { precipitation: '', temp: '' },
        today: { precipitation: '', temp: '' },
        tomorrow: { precipitation: '', temp: '' }
      }

    const now = new Date()
    const monthPrecipitation = precipitation[now.getMonth()]
    const monthTemp = temp[now.getMonth()]

    // TODO: not valid. `now.getDate() - 1` can result to 0th of November
    return {
      yesterday: { precipitation: monthPrecipitation[now.getDate() - 1], temp: monthTemp[now.getDate() - 1] },
      today: { precipitation: monthPrecipitation[now.getDate()], temp: monthTemp[now.getDate()] },
      tomorrow: { precipitation: monthPrecipitation[now.getDate() + 1], temp: monthTemp[now.getDate() + 1] }
    }
  }, [precipitation, temp])

  return (
    <div>
      {isLoading ? (
        <h1 className="text-3xl">Loading</h1>
      ) : (
        <div className="container lg:px-10 flex flex-col w-full mx-auto relative">
          <div className="absolute bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 -top-4 flex space-x-4 font-medium">
            <Calendar />
            {/* TODO: Today's date */}
            <span>17th November</span>
          </div>

          <div className="flex justify-center w-full">
            <h1 className="text-5xl pb-10 font-bold">Today</h1>
          </div>

          <div className="flex w-full space-x-20">
            <HomeDayCard {...yesterday} title="Yesterday" accidents={yesterdayAccidents} />
            <HomeDayCard {...today} accidents={todayAccidents} />
            <HomeDayCard {...tomorrow} title="Tomorrow" accidents={tomorrowAccidents} />
          </div>
        </div>
      )}
    </div>
  )
}

export { HomeModule }
