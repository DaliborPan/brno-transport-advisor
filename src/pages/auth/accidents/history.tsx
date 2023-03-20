import { GetStaticProps, NextPage } from 'next'
import { BaseLayout } from '../../../components/layouts'
import { getBrnoBikeAccidents } from '../../../hooks/accidents'
import { AccidentsHistoryModule } from '../../../modules'
import { BrnoBikeAccidentsResponse } from '../../../types/api'

const AccidentsHistoryPage: NextPage<{ data: BrnoBikeAccidentsResponse }> = ({ data }) => (
  <BaseLayout>
    <AccidentsHistoryModule data={data} />
  </BaseLayout>
)

export const getStaticProps: GetStaticProps = async () => {
  const brnoBikeAccidents = await getBrnoBikeAccidents()

  return {
    props: {
      data: brnoBikeAccidents
    }
  }
}

export default AccidentsHistoryPage
