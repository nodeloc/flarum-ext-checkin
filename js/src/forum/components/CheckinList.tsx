import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import dayjs from 'dayjs';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import CheckinButton from './CheckinButton';
import icon from 'flarum/common/helpers/icon';
//@ts-ignore
import load from 'external-load';
import CheckinListState from '../states/CheckinListSate';
import RecaptchaState from '../Recaptcha/RecaptchaState';
import Recaptcha from '../Recaptcha/Recaptcha';

export default class CheckinList extends Component<{ state: CheckinListState }, CheckinListState> {
  sitekey = app.forum.attribute('fof-recaptcha.credentials.site');
  loading: boolean = false;
  theme = app.forum.attribute('theme_dark_mode');
  type = app.forum.attribute('fof-recaptcha.type');
  size = app.forum.attribute('fof-recaptcha.type');
  state?: CheckinListState;
  recaptchaState?: RecaptchaState;
  selectRandom: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.state = this.attrs.state;
    if (app.forum.attribute('fof-recaptcha.configured')) {
      this.recaptchaState = new RecaptchaState(
        app.forum.data.attributes,
        () => {
          if (this.recaptchaState!.isInvisible()) {
            this.afterCheck(this.selectRandom);
          }
        },
        (alertAttrs: any) => {
          this.loading = false;
        }
      );
    }
  }

  oncreate(vnode: any) {
    super.oncreate(vnode);

  }
  getWeekdays() {
    // for China, Monday/day(1) is first day
    let displayDaysCount = 0;
    let startday;
    // if(app.forum.attribute('checkinConstant') === 1){
    //   displayDaysCount = app.forum.attribute('checkinConstantDays');
    //   startday = dayjs().subtract(displayDaysCount-1, 'day')
    // } else {
    //   startday = dayjs().day(1);
    //   displayDaysCount = 7;
    // }

    let todayNum: number = dayjs().day();
    if (todayNum === 0) {
      todayNum = 7;
    }
    startday = dayjs().subtract(todayNum - 1, 'day');

    displayDaysCount = 7;

    const displayDays = [];
    displayDays.push(startday.format('YYYY-MM-DD'));

    let i = 1;
    while (i <= displayDaysCount) {
      displayDays.push(startday.add(i, 'day').format('YYYY-MM-DD'));
      i++;
    }

    return displayDays;
  }

  view() {
    const checkins = this.state!.cache || [];
    const allowCheckin = app.session.user!.attribute("allowCheckin");
    const displayDays = this.getWeekdays();
    return (
      <div className="NotificationList CheckinList">
        <div className="NotificationList-header">
          <h4 className="App-titleControl App-titleControl--text">{app.translator.trans('gtdxyz-checkin.forum.reward-text')}</h4>
        </div>
        <div className="NotificationList-content">
          <ul className="NotificationGroup-content">
            {checkins.length > 0 ? (
              checkins.map((checkinItem, indx) => {
                const id = parseInt(checkinItem.id() || "0");
                const check_status = id > 0 ? 'checked' : 'uncheck';

                return (
                  <li className={check_status + ' count-' + checkins.length} title={check_status}>

                    {id > 0 ? (
                      <view>
                        <div className="Notification-content">
                          <span>
                            {dayjs(checkinItem.checkin_time()).format('MM/DD')}
                          </span>
                          <span>{dayjs(checkinItem.checkin_time()).format('ddd')}</span>
                        </div>
                        <div className="Notification-excerpt">
                          {icon('fas fa-star', { className: 'Notification-icon' })}
                        </div>
                      </view>
                    ) : (
                      <view>
                        <div className="Notification-content">
                          <span>
                            {dayjs(displayDays[indx]).format('MM/DD')}
                          </span>
                          <span>{dayjs(displayDays[indx]).format('ddd')}</span>
                        </div>
                        <div className="Notification-excerpt">

                          {dayjs().isAfter(displayDays[indx], 'day') ? (
                            icon('fas fa-minus', { className: 'Notification-icon' })
                          ) : (
                            icon('far fa-star', { className: 'Notification-icon' })
                          )}

                        </div>
                      </view>
                    )}

                  </li>
                );

              })
            ) : !(this.state!).loading ? (
              <div className="NotificationList-empty">{app.translator.trans('gtdxyz-checkin.forum.empty-text')}</div>
            ) : (
              <LoadingIndicator className="LoadingIndicator--block" />
            )}

          </ul>
          <div className="subtitle">
            {app.translator.trans('gtdxyz-checkin.forum.count-text', { count: app.session.user!.attribute('checkin_days_count') })} <br />
            {
              app.forum.attribute('checkinConstantForce') === 1 && (
                app.translator.trans('gtdxyz-checkin.forum.constant-recent-count-text', { count: app.session.user!.attribute('checkin_constant_count') })
              )
            }
          </div>
          <div>
            {allowCheckin ? <Recaptcha state={this.recaptchaState} /> : ""}
          </div>
          <div className="Form-group">
            {allowCheckin ? (
              <CheckinButton state='enabled' callback={this.check.bind(this)} loading={this.loading} />
            ) : (
              <CheckinButton state="disabled" loading={this.loading} />
            )}
          </div>
        </div>
      </div>
    );
  }


  check(e: MouseEvent, random: boolean) {
    e.preventDefault();
    e.stopPropagation();
    if (!app.forum.attribute('fof-recaptcha.configured')) return this.afterCheck(random);
    if (!(this.recaptchaState!.isInvisible())) return this.afterCheck(random);
    this.selectRandom = random;
    this.loading = true;
    this.recaptchaState?.execute();
  }
  afterCheck(random: boolean) {
    const token = this.recaptchaState?.getResponse();
    if (random)
      app.randomcheckinClick(token);
    else
      app.checkinClick(token);
  }
}
