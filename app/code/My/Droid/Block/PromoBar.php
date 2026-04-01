<?php

declare(strict_types=1);

namespace My\Droid\Block;

use Magento\Framework\View\Element\Template;
use My\Droid\Helper\Config;

class PromoBar extends Template
{
    /**
     * @var Config
     */
    private $configHelper;

    /**
     * @param Template\Context $context
     * @param Config $configHelper
     * @param array $data
     */
    public function __construct(
        Template\Context $context,
        Config $configHelper,
        array $data = []
    ) {
        $this->configHelper = $configHelper;
        parent::__construct($context, $data);
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
