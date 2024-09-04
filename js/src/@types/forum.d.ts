import CheckinListState from "../forum/states/CheckinListSate";

declare module 'flarum/forum/ForumApplication' {
    export default interface ForumApplication {
        recaptchaLoaded: boolean;
        checkinClick: (token: string) => void;
        randomcheckinClick: (token: string) => void;
        checkins: CheckinListState;
    }
}
declare module 'flarum/common/models/User' {
    export default interface User {
        canCheckin(): boolean;
    }
}
declare global {
    var recaptcha: any;
    var grecaptcha: any;
}