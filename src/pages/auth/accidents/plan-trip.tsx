import { GetStaticProps, NextPage } from 'next'
import { BaseLayout } from 'components/layouts'
import { getBrnoBikeAccidents } from 'hooks/accidents'
import { getAllLocations } from 'hooks/location'
import { PlanTripModule } from 'modules'
import { PlanTripPageProps } from 'types'
import { getAccidentsInLocations } from 'utils'

const PlanTripPage: NextPage<PlanTripPageProps> = (props) => (
  <BaseLayout>
    <PlanTripModule {...props} />
  </BaseLayout>
)

export const getStaticProps: GetStaticProps = async () => {
  const [accidents, locations] = await Promise.all([getBrnoBikeAccidents(), getAllLocations()])

  return {
    props: {
      locationAccidents: getAccidentsInLocations(accidents, locations),
      allLocations: locations
    }
  }
}

export default PlanTripPage
