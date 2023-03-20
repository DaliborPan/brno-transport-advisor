import { GetStaticProps, NextPage } from 'next'
import { BaseLayout } from 'components/layouts'
import { getAllLocations } from 'hooks/location'
import { ProfileModule } from 'modules'
import { Location } from 'utils/firebase'

const ProfilePage: NextPage<{ definedLocations: Location[] }> = (props) => (
  <BaseLayout>
    <ProfileModule {...props} />
  </BaseLayout>
)

export const getStaticProps: GetStaticProps = async (props) => {
  return {
    props: {
      definedLocations: await getAllLocations()
    }
  }
}

export default ProfilePage
