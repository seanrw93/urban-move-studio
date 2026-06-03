import { StepNumber } from '../../atoms/StepNumber/StepNumber';
import './StepItem.scss';

interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

export function StepItem({ number, title, description }: StepItemProps) {
  return (
    <div className="step-item">
      <div className="step-item__number">
        <StepNumber number={number} />
      </div>
      <div className="step-item__content">
        <h3 className="step-item__title">{title}</h3>
        <p className="step-item__description">{description}</p>
      </div>
    </div>
  );
}
