<?php

namespace Gtdxyz\Checkin\Validator;
use Flarum\Foundation\AbstractValidator;

class CheckinValidator extends AbstractValidator
{
    protected function getRules()
    {
        return ['g-recaptcha-response' => ['required', 'recaptcha']];
    }
}