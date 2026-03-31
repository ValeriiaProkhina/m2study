<?php

namespace Perspective\ServicePages\Controller\Adminhtml\ContentType\Image;

use Exception;
use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Cms\Helper\Wysiwyg\Images;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Controller\ResultInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\File\UploaderFactory;
use Magento\Framework\Filesystem\DirectoryList;
use Magento\Framework\UrlInterface;
use Magento\Store\Model\StoreManagerInterface;

class Upload extends Action implements HttpPostActionInterface
{
    const UPLOAD_DIR = 'wysiwyg';

    const ADMIN_RESOURCE = 'Magento_Backend::content';

    /**
     * @var DirectoryList
     */
    private $directoryList;

    /**
     * @var JsonFactory
     */
    private $resultJsonFactory;

    /**
     * @var UploaderFactory
     */
    private $uploaderFactory;

    /**
     * @var StoreManagerInterface
     */
    private $storeManager;

    /**
     * @var Images
     */
    private $cmsWysiwygImages;

    public function __construct(
        Context $context,
        JsonFactory $resultJsonFactory,
        StoreManagerInterface $storeManager,
        UploaderFactory $uploaderFactory,
        DirectoryList $directoryList,
        Images $cmsWysiwygImages
    ) {
        parent::__construct($context);
        $this->resultJsonFactory = $resultJsonFactory;
        $this->storeManager      = $storeManager;
        $this->uploaderFactory   = $uploaderFactory;
        $this->directoryList     = $directoryList;
        $this->cmsWysiwygImages  = $cmsWysiwygImages;
    }

    private function getFilePath(string $path, string $imageName): string
    {
        return rtrim($path, '/') . '/' . ltrim($imageName, '/');
    }

    public function execute(): ResultInterface
    {
        $fieldName    = $this->getRequest()->getParam('param_name');
        $fileUploader = $this->uploaderFactory->create(['fileId' => $fieldName]);

        $fileUploader->setFilesDispersion(false);
        $fileUploader->setAllowRenameFiles(true);
        $fileUploader->setAllowedExtensions(['jpeg', 'jpg', 'png', 'gif', 'svg', 'webp']);
        $fileUploader->setAllowCreateFolders(true);

        try {
            if (!$fileUploader->checkMimeType([
                'image/png', 'image/jpeg', 'image/gif',
                'image/svg', 'image/svg+xml', 'image/webp',
            ])) {
                throw new LocalizedException(__('File validation failed.'));
            }

            $result  = $fileUploader->save($this->getUploadDir());
            $baseUrl = $this->storeManager->getStore()->getBaseUrl(UrlInterface::URL_TYPE_MEDIA);

            $result['id']  = $this->cmsWysiwygImages->idEncode($result['file']);
            $result['url'] = $baseUrl . $this->getFilePath(self::UPLOAD_DIR, $result['file']);
        } catch (Exception $e) {
            $result = [
                'error'     => $e->getMessage(),
                'errorcode' => $e->getCode(),
            ];
        }

        return $this->resultJsonFactory->create()->setData($result);
    }

    private function getUploadDir(): string
    {
        return $this->directoryList->getPath('media') . DIRECTORY_SEPARATOR . self::UPLOAD_DIR;
    }
}

