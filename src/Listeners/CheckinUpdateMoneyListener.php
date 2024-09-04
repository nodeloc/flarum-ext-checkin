<?php

namespace Gtdxyz\Checkin\Listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Locale\Translator;
use Flarum\Settings\SettingsRepositoryInterface;

use Gtdxyz\Checkin\Event\CheckinHistoryEvent;
use AntoineFr\Money\Event\MoneyUpdated;
use Mattoid\MoneyHistory\Event\MoneyHistoryEvent;


class CheckinUpdateMoneyListener
{
    private string $source = "CHECKINSAVED";
    private string $sourceDesc;

    private $events;
    private $settings;

    public function __construct(Dispatcher $events, SettingsRepositoryInterface $settings, Translator $translator)
    {
        $this->events = $events;
        $this->settings = $settings;
        $this->source = "CHECKINSAVED";
        $this->sourceDesc = $translator->trans("gtdxyz-checkin.forum.source-desc");
    }

    public function handle(CheckinHistoryEvent $checkin) {
        $user = $checkin->user;
        $amount = $checkin->reward_money;
        $user->last_checkin_time = $checkin->checkin_time;
        $user->last_checkin_money = $amount;
        $user->money = $user->money + $amount;
        $user->save();
        $this->events->dispatch(new MoneyUpdated($user));
        $this->events->dispatch(new MoneyHistoryEvent($user, $amount, $this->source, $this->sourceDesc));
    }
}
