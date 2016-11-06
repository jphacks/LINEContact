<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class LineMessagingController extends Controller
{

    public function messageCallback() {
        $this->messagePush("U386358a629dc5d396ff56e3589426d53", "あいうえお");
        $raw = file_get_contents('php://input');

        $message = json_decode($raw, true);




        $data = ["token" => $message['events'][0]['replyToken'],
            "event_type" => $message['events'][0]['type'],
            "userId" => $message['events'][0]['source']['userId'],
            "message_type" => $message['events'][0]['message']['type'],
            "message_text" => $message['events'][0]['message']['text']
        ];
//
//        ob_start();
//        var_dump($data);
//        $result =ob_get_contents();
//        ob_end_clean();
//
//        $fp = fopen("/Users/nappannda/Desktop/sample.txt", "w");
//        fwrite($fp, $result);
//        fclose($fp);
    }

    public function messagePush($user_id, $text) {
        $CHANNEL_ACCESS_TOKEN = "C8MbXPTyOAiIXjtkrYzmPR+6gAqLF6YwaHQW489q67lYliKbqBKfDi0Y0V0wEVJpL/E9ZivVuIdTJ7FcizLlNLjYQlA4rZuhtwlopvom/SWWAjHF77lOIzprlzUMOaph5Fl8s+zWan6grxOu/wqqbwdB04t89/1O/w1cDnyilFU=";
        $comand = sprintf("curl -X POST -H 'Content-Type:application/json' -H 'Authorization: Bearer %s' -d '{\"to\": \"%s\",  \"messages\":[{\"type\":\"text\",\"text\":\"%s\"}]}' https://api.line.me/v2/bot/message/push",$CHANNEL_ACCESS_TOKEN,$user_id,$text);
        exec($comand);
    }

}
