export class Measurement {
  id: string;
  timestamp: Date;
  value: number;
  sensorId: string;
  sensorDescription: string;


  constructor(id: string, timestamp: Date, value: number, sensorId: string, sensorDescription: string) {
    this.id = id;
    this.timestamp = timestamp;
    this.value = value;
    this.sensorId = sensorId;
    this.sensorDescription = sensorDescription;
  }
}
