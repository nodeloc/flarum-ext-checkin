import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import type dayjs from 'dayjs';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import icon from 'flarum/common/helpers/icon';
import CheckinListState from '../states/CheckinListSate';

export default class CheckinButton extends Component<{ state: "enabled" | string, callback?: (e: MouseEvent, random: boolean) => any, loading?: boolean }> {
  stateString: string = "";
  oninit(vnode: any) {
    super.oninit(vnode);
    this.stateString = this.attrs.state;
  }
  view() {
    let buttons;
    if (this.stateString === 'enabled') {
      return <div>
        <Button
          icon='far fa-check-circle'
          className='Button CheckinButton CheckinButton--active'
          id="checkinButton"
          onclick={((e: MouseEvent) => (this.attrs.callback && this.attrs.callback(e, false))).bind(this)}
          disabled={this.attrs.loading}
          loading={this.attrs.loading}
        >
          {app.translator.trans('gtdxyz-checkin.forum.common-checkin', { amount: app.forum.attribute("checkinReward") })}
        </Button>
        <Button
          icon='fas fa-random'
          className='Button CheckinButton CheckinButton--checked'
          id="randomcheckinButton"
          onclick={((e: MouseEvent) => (this.attrs.callback && this.attrs.callback(e, true))).bind(this)}
          disabled={this.attrs.loading}
          loading={this.attrs.loading}
        >{app.translator.trans('gtdxyz-checkin.forum.lucky-checkin')}
        </Button>
      </div>;
    } else {
      return <div>
        <Button
          icon='fas fa-check-square'
          className='Button CheckedButton CheckinButton--checked'
          disabled={true}
          loading={this.attrs.loading}
        >
          {app.translator.trans('gtdxyz-checkin.forum.checked-days', { count: app.session.user!.attribute("checkin_days_count") })}
        </Button>
      </div>;
    }
  }
}
