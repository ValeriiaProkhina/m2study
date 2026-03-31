<?php
use Magento\Framework\Component\ComponentRegistrar;
ComponentRegistrar::register(
    ComponentRegistrar::THEME,
    'frontend/MyVendor/newtheme',
    __DIR__
);
