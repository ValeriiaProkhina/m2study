<?php

declare(strict_types=1);

namespace My\Droid\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Store\Model\ScopeInterface;

class Config extends AbstractHelper
{

    const XML_PATH_BACKGROUND_COLOR = 'my_droid_promo/general/background_color';
    const XML_PATH_TEXT_COLOR = 'my_droid_promo/general/text_color';

    /**
     * 
     * @param int|null 
     * @return string 
     */
    public function getBackgroundColor($storeId = null): string
    {
        return (string) $this->scopeConfig->getValue(
            self::XML_PATH_BACKGROUND_COLOR,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     *
     * 
     * @param int|null 
     * @return string 
     */
    public function getTextColor($storeId = null): string
    {
        return (string) $this->scopeConfig->getValue(
            self::XML_PATH_TEXT_COLOR,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }
}
