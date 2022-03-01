export class Sensor {
  id: string;
  sensorDescription: string;
  maxValue: number;
  deviceId: string;
  //lista de measurements

  constructor(sensorDescription: string, maxValue: number) {
    this.sensorDescription = sensorDescription;
    this.maxValue = maxValue;

  }
}
