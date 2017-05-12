import moment from 'moment'

const extractDate = (date) => {
  return new Date(typeof date === 'number' && date < 10000000000 ? date * 1000 : date)
}

export default {
  filters: {
    timeAgo (date) {
      return moment(extractDate(date)).fromNow()
    }
  }
}
