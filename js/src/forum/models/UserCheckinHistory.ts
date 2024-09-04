import Model from 'flarum/common/Model';
import type User from 'flarum/common/models/User';

export default class UserCheckinHistory extends Model {
  user_id = Model.attribute('user_id');
  type = Model.attribute('type');
  event_id = Model.attribute('event_id');
  checkin_time = Model.attribute('checkin_time', Model.transformDate);
  reward_money = Model.attribute('reward_money');
  constant = Model.attribute('constant');
  remark = Model.attribute('remark');
  user = Model.hasOne('user');
}