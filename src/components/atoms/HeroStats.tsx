type StatProps = {
  title: string
  value: number
  desc: string
}

const Stat = ({ title, value, desc }: StatProps) => {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  )
}

type HeroStatsProps = {
  thisMonth: StatProps
  thisYear: StatProps
  allTime: StatProps
}

export const HeroStats = ({ thisMonth, thisYear, allTime }: HeroStatsProps) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <Stat {...thisMonth} />
      <Stat {...thisYear} />
      <Stat {...allTime} />
    </div>
  )
}
