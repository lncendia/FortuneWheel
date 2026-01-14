export interface Prize {
  name: string;
  color: string;
}

export interface WheelProps {
  prizes: Prize[];
  rotation: number;
  isSpinning: boolean;
  selectedPrize: Prize | null;
  onSpinComplete: () => void;
}

export interface StyledSpinnerProps {
  $rotate: number;
  $prizes: Array<{ color: string }>;
  $isSpinning: boolean;
}
