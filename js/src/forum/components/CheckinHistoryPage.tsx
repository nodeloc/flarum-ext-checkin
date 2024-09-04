import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import CheckinContent from "./CheckinContent";

export default class CheckinHistoryPage extends Page {

    oninit(vnode:any) {
        super.oninit(vnode);

        //TODO  这里为什么会少一个参数？？补了一个空串
        app.history.push('UserCheckinRoute',"");

        app.checkins.load();
    }

    oncreate(vnode:any) {
      super.oncreate(vnode);
      app.setTitle(app.translator.trans('gtdxyz-checkin.forum.checkin') as string);
      
    }

    view() {
      return (
        <div>
          <CheckinContent state={app.checkins}></CheckinContent>
        </div>
      );
    }
}
