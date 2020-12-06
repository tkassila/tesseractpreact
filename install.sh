echo "# Installing java"
apt-get update
apt-get -y -q install unzip

echo "# Installing Tika"
mkdir install

echo "#Installing tesseract"
apt-get -y -q install tesseract-ocr tesseract-ocr-swe tesseract-ocr-eng  tesseract-ocr-fin

echo "# Cleaning up"
apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
