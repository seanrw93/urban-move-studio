import './StepNumber.scss';

interface StepNumberProps {
  number: number;
}

export function StepNumber({ number }: StepNumberProps) {
  return (
    <div className="step-number">
      <span className="step-number__value">
        {String(number).padStart(2, '0')}
      </span>
    </div>
  );
}
