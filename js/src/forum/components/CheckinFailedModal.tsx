import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import app from 'flarum/forum/app';

export default class checkinFailedModal extends Modal {
  oninit(vnode: any) {
    super.oninit(vnode);
  }

  className() {
    return 'CheckinModal Modal--small';
  }

  title() {
    return (<div className="failedTitle">{app.translator.trans('gtdxyz-checkin.forum.failed')}</div>);
  }

  content() {
    //
    return (
      <div className="Modal-body">
        <div className="modalText">{app.translator.trans('gtdxyz-checkin.forum.try-again-later')}</div>
      </div>
    );
  }
}
