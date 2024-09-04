import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import type dayjs from 'dayjs';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

import icon from 'flarum/common/helpers/icon';

export default class CheckinButton extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.state = this.attrs.state;
  }
  view() {
    const btn = this.state;
    let buttons;
    if (btn === 'enabled') {
      buttons = [
        Button.component({
          icon: 'far fa-check-circle',
          className: 'Button CheckinButton CheckinButton--active',
          id: "checkinButton",
          onclick: app.checkinClick,
        }, app.translator.trans('gtdxyz-checkin.forum.common-checkin', {amount: app.forum.attribute("checkinReward")})),
        Button.component({
          icon: 'fas fa-random',
          className: 'Button CheckinButton CheckinButton--checked',
          id: "randomcheckinButton",
          onclick: app.randomcheckinClick,
        }, app.translator.trans('gtdxyz-checkin.forum.lucky-checkin'))
      ];
    } else {
      buttons = [
        Button.component({
          icon: 'fas fa-check-square',
          className: 'Button CheckedButton CheckinButton--checked',
          disabled: true
        }, app.translator.trans('gtdxyz-checkin.forum.checked-days', {count: app.session.user.attribute("checkin_days_count")}))
      ];
    }

    return m('div', buttons);
  }
}
