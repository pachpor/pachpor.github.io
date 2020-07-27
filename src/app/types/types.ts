export interface CountryInfo {
  ourid: number;
  title: string;
  code: string;
  source: string;
}

export interface GlobalInfo {
  total_cases: number;
  total_recovered: number;
  total_deaths: number;
  total_new_cases_today: number;
  total_new_deaths_today: number;
  total_active_cases: number;
  total_serious_cases: number;
}

export interface CountryTotalData {
  info: CountryInfo;
  total_cases: number;
  total_recovered: number;
  total_deaths: number;
  total_new_cases_today: number;
  total_new_deaths_today: number;
  total_active_cases: number;
  total_serious_cases: number;
  total_danger_rank: number;
}

export interface CountryDailyData {
new_daily_cases: number;
new_daily_deaths: number;
total_cases: number;
total_recoveries: number;
total_deaths: number;
}

export interface CountryDataTimeline {
  date: string;
  new_daily_cases: number;
  new_daily_deaths: number;
  total_cases: number;
  total_recoveries: number;
  total_deaths: number;
}
