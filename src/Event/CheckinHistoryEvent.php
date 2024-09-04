<?php

namespace Gtdxyz\Checkin\Event;

use Flarum\User\User;

class CheckinHistoryEvent
{

    public $user;
    public $checkin_time;
    public $reward_money;
    public $type;
    public $event_id;
    public $constant;
    public $remark;
    function generateNormalRandom($min, $max) {
        $u1 = 1.0 - rand() / (getrandmax() + 1.0);
        $u2 = 1.0 - rand() / (getrandmax() + 1.0);
        $z = sqrt(-2.0 * log($u1)) * cos(2.0 * M_PI * $u2);
        $mean = ($min + $max) / 2.0;
        $stddev = ($max - $min) / 6.0; // Adjust this factor to change the spread of the distribution
        $x = $mean + $stddev * $z;

        // Ensure the generated value falls within the specified range
        $x = max($min, min($max, $x));

        return round($x);
    }
    public function __construct(User $user = null, $checkin_time = null, $reward_money = 0, $constant = 0, $type='N', $event_id = 0, $remark="")
    {
        $this->user = $user;
        $this->checkin_time = $checkin_time;
        if($type=='R'){
            if($reward_money>100){
                $act_reward = $this->generateNormalRandom(1, ($reward_money-100)*2) ;
                $this->reward_money = $act_reward + 100;
            }else{
                $this->reward_money = $this->generateNormalRandom(1, $reward_money*2);
            }
        }else{
            $this->reward_money = $reward_money;
        }
        $this->type = $type;
        $this->event_id = $event_id;
        $this->constant = $constant;
        $this->remark = $remark;
    }

}
