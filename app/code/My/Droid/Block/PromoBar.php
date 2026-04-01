<?php

declare(strict_types=1);

namespace My\Droid\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Serialize\Serializer\Json;
use My\Droid\Helper\Config;

class PromoBar extends Template
{
    /**
     * @var Config
     */
    private $configHelper;

    /**
     * @var Json
     */
    private $serializer;

    /**
     * @param Template\Context $context
     * @param Config $configHelper
     * @param Json $serializer
     * @param array $data
     */
    public function __construct(
        Template\Context $context,
        Config $configHelper,
        Json $serializer,
        array $data = []
    ) {
        $this->configHelper = $configHelper;
        $this->serializer = $serializer;
        parent::__construct($context, $data);
    }

    /**
     * Override getJsLayout to inject admin-configured colors into component config
     *
     * @return string
     */
    public function getJsLayout(): string
    {
        $jsLayout = $this->jsLayout;
        if (isset($jsLayout['components']['promo-bar-component'])) {
            $jsLayout['components']['promo-bar-component']['config']['backgroundColor'] = $this->getBackgroundColor();
            $jsLayout['components']['promo-bar-component']['config']['textColor'] = $this->getTextColor();
        }
        return $this->serializer->serialize($jsLayout);
    }

    /**
     * 
     * 
     * @return string
     */
    public function getBackgroundColor(): string
    {
        return $this->configHelper->getBackgroundColor();
    }

    /**
     * 
     * 
     * @return string
     */
    public function getTextColor(): string
    {
        return $this->configHelper->getTextColor();
    }
}
