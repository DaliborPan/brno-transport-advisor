import clsx from 'clsx'
import { Icon } from 'react-feather'
import { BaseIconInput, BaseInputProps } from 'components/atoms'

const InputLabel = ({ label, wrapperClasses = '' }: { label: string; wrapperClasses?: string }) => (
  <div className={clsx('whitespace-nowrap', wrapperClasses)}>
    <span className="text-xs xl:text-base px-4 py-2 bg-lighterpink rounded-xl">{label}</span>
  </div>
)

type LabeledInputProps = BaseInputProps & {
  label: string
  Icon: Icon
}

export const LabeledInput = ({ label, Icon, ...inputProps }: LabeledInputProps) => {
  return (
    <div className="pt-4 flex flex-col lg:flex-row lg:items-center w-full">
      <InputLabel label={label} wrapperClasses="lg:w-1/4 mb-2 lg:mb-0" />
      <BaseIconInput Icon={Icon} extraWrapperClasses="grow" {...inputProps} />
    </div>
  )
}
