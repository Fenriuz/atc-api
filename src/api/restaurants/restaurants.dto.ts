import { IsNotEmpty, IsString } from 'class-validator';

export class Location {
  readonly coordinates: [];
}

export class CreateDay {
  readonly closed: boolean;
  readonly hours: number[];
}

export class CreateSchedule {
  readonly monday: CreateDay;
  readonly tuesday: CreateDay;
  readonly wednesday: CreateDay;
  readonly thursday: CreateDay;
  readonly friday: CreateDay;
  readonly saturday: CreateDay;
  readonly sunday: CreateDay;
}

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly locations: Location;

  @IsNotEmpty()
  readonly schedule: CreateSchedule;
}

export class UpdateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly locations: Location;

  @IsNotEmpty()
  readonly schedule: CreateSchedule;
}
