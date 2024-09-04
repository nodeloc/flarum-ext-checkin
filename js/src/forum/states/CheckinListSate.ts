import dayjs from 'dayjs';
import app from 'flarum/forum/app';
import UserCheckinHistory from '../models/UserCheckinHistory';

export default class CheckinListState {
  cache: UserCheckinHistory[] = [];
  loading: boolean;
  constructor() {
    /**
     * Whether or not the list are loading.
     */
    this.loading = false;
  }

  /**
   * Load list into the application's cache if they haven't already
   * been loaded.
   */
  load() {

    // if online cross 24H
    if (this.cache && app.session.user!.attribute('checkin_sync')) {
      if (dayjs(app.session.user!.attribute('checkin_sync')).isSame(dayjs().format('YYYY-MM-DD'), 'day')) {
        return;
      }
    }

    this.loading = true;
    m.redraw();

    app.store
      .find<UserCheckinHistory[]>('checkin/history')
      .then((checkins) => {
        app.session.user!.pushAttributes({ checkin_sync: dayjs().format('YYYY-MM-DD') });
        this.cache = checkins;
      })
      .catch(() => { })
      .then(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
