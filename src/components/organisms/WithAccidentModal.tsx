import { useCallback, useState } from 'react'
import { BrnoBikeAccidentsResponse } from 'types/api'
import { Button } from 'components/atoms'
import { AccidentDetail, CustomModal } from 'components/molecules'

type AccidentDetailModalProps = {
  accident: BrnoBikeAccidentsResponse[0]['attributes']
  isOpen: boolean
  closeModal: () => void
}

const AccidentDetailModal = ({ accident, isOpen, closeModal }: AccidentDetailModalProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      body={<AccidentDetail accident={accident} extraWrapperClasses="" />}
      action={
        <Button
          extraClasses="bg-lighterblue text-blue-800 font-semibold border-none hover:bg-lightblue"
          onClick={closeModal}
          label="Zavřít"
        />
      }
    />
  )
}

type WithAccidentModalProps = {
  accident: BrnoBikeAccidentsResponse[0]['attributes']
  children: (onModalOpen: () => void) => React.ReactNode
}

export const WithAccidentModal = ({ children, accident }: WithAccidentModalProps) => {
  const [isAccidentOpened, setIsAccidentOpened] = useState(false)

  const onModalOpen = useCallback(() => setIsAccidentOpened(true), [])

  return (
    <>
      {children(onModalOpen)}
      <AccidentDetailModal
        accident={accident}
        isOpen={isAccidentOpened}
        closeModal={() => setIsAccidentOpened(false)}
      />
    </>
  )
}
