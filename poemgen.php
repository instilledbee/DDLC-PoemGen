<?php

function getFontFile($font) {
    $fontPath = 'journal.otf';
    switch($font) {

        case 'sayori':
            $fontPath = 'css/hashtag.otf';
            break;

        case 'natsuki':
            $fontPath = 'css/ammys-handwriting.ttf';
            break;

        case 'yuri1':
            $fontPath = 'css/jp-hand.ttf';
            break;

        case 'yuri2':
            $fontPath = 'css/as-i-lay-dying.ttf';
            break;

        case 'yuri3':
            $fontPath = 'css/damagrafik-script.ttf';
            break;

        case 'special':
            $fontPath = 'css/atypewriterforme.ttf';
            break;

        default:
            $fontPath = 'css/journal.otf';
            break;
    }

    return $fontPath;
}

function drawOutput($font, $poem) {
    $bg = new Imagick();
    $bg->readImage(realpath("img/club.png"));
    
    $paper = new Imagick();
    $paper->readImage(realpath("img/poem.jpg"));
    
    $text = new Imagick();
    
    $draw = new ImagickDraw();
    $draw->setFont(realpath(getFontFile($font)));
    $draw->setFontSize(16);
    $draw->composite(Imagick::COMPOSITE_ATOP, 0, 0, 0, 0, $bg);
    $draw->composite(Imagick::COMPOSITE_ATOP, 240, 0, 0, 0, $paper);
    $draw->annotation(270, 40, $poem);
    
    /* Create a new canvas object and a white image */
    $canvas = new Imagick();
    $canvas->newImage(1280, 720, "white");
    
    /* Draw the ImagickDraw on to the canvas */
    $canvas->drawImage($draw);
    
    /* Set the format to PNG */
    $canvas->setImageFormat('png');

    return $canvas;
}

function cleanInputs($data) {
    $clean_input = Array();
    if (is_array($data)) {
        foreach ($data as $k => $v) {
            $clean_input[$k] = cleanInputs($v);
        }
    } else {
        $clean_input = trim(strip_tags($data));
    }
    return $clean_input;
}

    
/* Output the image */

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    //echo $args['poemFont'] . $args['poem'];
    //echo getFontFile($args['poemFont']);
    header("Content-Type: image/png");
    $args = cleanInputs($_POST);
    echo drawOutput($args['poemFont'], $args['poem']);;
}
?>