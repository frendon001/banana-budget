import moment from 'moment';

export class BananaBudget {
  startDate: string;
  numberOfDays: string;
  days: number;
  errorMessage: object;
  hasValidParams: boolean;

  constructor({ startDate, numberOfDays }) {
    this.startDate = startDate;
    this.numberOfDays = numberOfDays;
    this.errorMessage = {};
    this.hasValidParams = this.validateParams();
  }

  validateParams(): boolean {
    //Check startDate and numberofDays are present
    if (!this.startDate || !this.numberOfDays) {
      //Missing parameters
      this.errorMessage = {
        error: 'Please enter a Start Date and/or Number of Days.',
      };
      return false;
    }

    if (!this.validateDate() || !this.validateDays()) {
      return false;
    }

    //All parameters are valid
    return true;
  }

  validateDate(): boolean {
    const validDate = /^((0|1)\d{1})\/(((0|1|2)\d{1})|[3](0|1))\/((19|20)\d{2})$/;
    //Set error message for invalid date
    if (
      !validDate.test(this.startDate) ||
      !moment(this.startDate, 'MM/DD/YYYY').isValid()
    ) {
      this.errorMessage = {
        error: 'Please enter a valid Date in MM/DD/YYYY format.',
      };
      return false;
    }

    //Date is valid
    return true;
  }

  validateDays(): boolean {
    const validNumberOfDays = /^\d+$/;
    //Set error message for invalid number of days
    if (!validNumberOfDays.test(this.numberOfDays)) {
      this.errorMessage = {
        error: 'Please enter a valid number of days.',
      };
      return false;
    } else {
      //Convert valid number to integer and check for zero value
      this.days = parseInt(this.numberOfDays, 10);
      if (this.days === 0) {
        this.errorMessage = {
          error: 'Please enter a number of days greater than zero.',
        };
        return false;
      }
    }
    //number of days are valid
    return true;
  }

  bananaPriceByDayInCents(day: number): number {
    // price in cents based day of month
    if (day <= 7) {
      return 5;
    } else if (day <= 14) {
      return 10;
    } else if (day <= 21) {
      return 15;
    } else if (day <= 28) {
      return 20;
    } else {
      return 25;
    }
  }

  isWeekday(weekdayVal: number): boolean {
    if (weekdayVal > 0 && weekdayVal < 6) {
      return true;
    } else {
      return false;
    }
  }

  totalBananaExpenses(): string {
    const currentDate = moment(this.startDate, 'MM/DD/YYYY');
    let daysLeft = this.days;
    let dayOfWeek;
    let dayofMonth;
    let totalCost = 0;

    while (daysLeft > 0) {
      dayOfWeek = currentDate.day();
      dayofMonth = currentDate.date();
      //Increase total price if weekday
      if (this.isWeekday(dayOfWeek)) {
        totalCost += this.bananaPriceByDayInCents(dayofMonth);
      }
      currentDate.add(1, 'days');
      daysLeft--;
    }
    //Convert totalCost to dollar value
    totalCost = totalCost > 0 ? totalCost / 100 : 0;
    return totalCost.toFixed(2);
  }

  showErrorMessage(): object {
    return this.errorMessage;
  }
  showHasValidParams(): boolean {
    return this.hasValidParams;
  }
}

