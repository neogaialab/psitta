export class RelativeTime {
  constructor(public value: number, public unit: Intl.RelativeTimeFormatUnit) { }
}

export class DateRange {
  constructor(public startDate: Date, public endDate: Date) { }
}
