export class Device{
  id:string;
  description:string;
  location:string;
  maxEnergyConsumption:number;
  avgEnergyConsumption:number;
  userId:string;

  constructor(description:string,location:string,maxEnergyConsumption:number,avgEnergyConsumption:number,userId:string){
    this.description=description;
    this.location=location;
    this.maxEnergyConsumption=maxEnergyConsumption;
    this.avgEnergyConsumption=avgEnergyConsumption;
    this.userId=userId;
  }




}
