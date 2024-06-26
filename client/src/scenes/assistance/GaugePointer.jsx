import * as React from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill='#9D8DFE' />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke='#9D8DFE'
        strokeWidth={3}
      />
    </g>
  );
}

export default function CompositionExample({ value, color }) {
  return (
    <GaugeContainer
      width={300}
      height={300}
      startAngle={-110}
      endAngle={110}
      value={value}
    >
      <GaugeReferenceArc sx={{ fill: "#D3E7F6" }} />
      <GaugeValueArc sx={{ fill: color }} />
      <GaugePointer />
    </GaugeContainer>
  );
}
