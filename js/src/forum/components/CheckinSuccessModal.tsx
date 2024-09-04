import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import app from 'flarum/forum/app';

export default class CheckinSuccessModal extends Modal {
  oninit(vnode:any) {
    super.oninit(vnode);
  }

  className() {
    return 'CheckinModal Modal--small';
  }

  title() {
    return (<div className="successTitle">{app.translator.trans('gtdxyz-checkin.forum.success')}</div>);
  }

  content() {
    //
    const checkin_days_count = app.session.user!.attribute<number>("checkin_days_count");
    const lastcheckinmoney = app.session.user!.attribute<number>("lastCheckinMoney");
    const checkinSuccessText = app.forum.attribute<string>("checkinSuccessText");
    const checkinSuccessRewardText = app.forum.attribute<string>("checkinSuccessRewardText");
    const moneyExtensionExist = app.forum.attribute('antoinefr-money.moneyname') !== undefined;

    let moneyName = "";
    let rewardText = "";
    let successTextClassName = "CheckinModal hideText";
    let rewardTextClassName = "CheckinModal hideText";

    if (checkinSuccessText !== "") {
      successTextClassName = "CheckinModal successText";
    }
    const idioms: Record<number, string[]> = {
      1: ["唉~~~~~"],
      2: ["时运不济"],
      3: ["时运不济"],
      4: ["平淡无奇"],
      5: ["平淡无奇"],
      6: ["寻常如故"],
      7: ["寻常如故"],
      8: ["转运亨通"],
      9: ["转运亨通"],
      10: ["幸运降临"],
      11: ["幸运降临"],
      12: ["顺风顺水"],
      13: ["顺风顺水"],
      14: ["福气绵绵"],
      15: ["福气绵绵"],
      16: ["鸿运当头"],
      17: ["鸿运当头"],
      18: ["天时地利人和"]
    };
    let result: string[] = [];

    let act_money = 0;
    if (moneyExtensionExist === true && checkinSuccessRewardText !== "") {
      moneyName = app.forum.attribute('antoinefr-money.moneyname') || '[money]';
      rewardText = moneyName.replace('[money]', lastcheckinmoney + "");

      rewardTextClassName = "checkInResultModal rewardText";
      if (lastcheckinmoney > 100) {
        rewardText = rewardText + ' , 其中连续签到 7 天额外奖励 100能量  ';
        act_money = lastcheckinmoney - 100;
      } else {
        act_money = lastcheckinmoney;
      }
      if (idioms[act_money]) {
        result = idioms[act_money];
      }
    }

    return (
      <div className="Modal-body">
        <div className={successTextClassName}>{checkinSuccessText.replace('[days]', (checkin_days_count + 1)+"")}</div>
        <div className={rewardTextClassName}>您今天{result.join(", ")}，{checkinSuccessRewardText.replace('[reward]', rewardText)}</div>
      </div>
    );
  }
}
