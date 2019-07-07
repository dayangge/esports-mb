export default {
  '/api/gameList':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
    'code': 0,
    'msg': '16ms',
    'data': [
      {
        'game_id': 'e5a06e1d697c45e2824cc5d2ad0c8b96',
        'name_cn': '刀塔II',
        'name_en': 'dota2',
        'logo': 'https://img.avia01.com/upload/201804/08142117a58f.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': "89591c4362ac457fa9b2562ba43d59c0",
        'name_cn': '英雄联盟',
        'name_en': 'LOL',
        'logo': 'https://img.avia01.com/upload/201809/0712370353b5.jpeg',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': "b2d30527c8624cda88bfeb8381cc4d8f",
        'name_cn': '反恐精英',
        'name_en': 'cs',
        'logo': 'https://img.avia01.com/upload/201804/08142101a2a8.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': "2f6832360c314844b632eecb09e812c1",
        'name_cn': '王者荣耀',
        'name_en': 'aok',
        'logo': 'https://img.avia01.com/upload/201809/17013704496d.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id':"58a9eae69ee142a9ade0ad87ccf3d039",
        'name_cn': '绝地求生',
        'name_en': 'PUBG',
        'logo': 'https://img.avia01.com/upload/201804/081428128868.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2589,
        'name_cn': '堡垒之夜',
        'name_en': '堡垒之夜',
        'logo': 'https://img.avia01.com/upload/201809/170829126f87.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id':  "e63436487192443680b001d3b16d53ac",
        'name_cn': '守望先锋',
        'name_en': 'ow',
        'logo': 'https://img.avia01.com/upload/201804/08142054167a.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2083,
        'name_cn': '魔兽争霸',
        'name_en': '',
        'logo': 'https://img.avia01.com/upload/201810/292050484e53.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2085,
        'name_cn': '星际争霸',
        'name_en': '',
        'logo': 'https://img.avia01.com/upload/201805/08191155a4d5.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2636,
        'name_cn': '穿越火线',
        'name_en': 'CF',
        'logo': 'https://img.avia01.com/upload/201808/302058100d77.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2095,
        'name_cn': '风暴英雄',
        'name_en': 'Heroes',
        'logo': 'https://img.avia01.com/upload/201809/17083428da7c.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2706,
        'name_cn': 'QQ飞车',
        'name_en': '',
        'logo': 'https://img.avia01.com/upload/201809/2321475956b9.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2321,
        'name_cn': 'NBA2K',
        'name_en': 'NBA',
        'logo': 'https://img.avia01.com/upload/201806/16214709119f.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2333,
        'name_cn': 'FIFA Online',
        'name_en': 'FIFA',
        'logo': 'https://img.avia01.com/upload/201806/20122917fe40.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2084,
        'name_cn': '炉石传说',
        'name_en': '',
        'logo': 'https://img.avia01.com/upload/201809/17012454475d.png',
        'Count': 12,
      }, {
        'game_id': 2362,
        'name_cn': '火箭联盟',
        'name_en': '',
        'logo': 'https://img.avia01.com/upload/201806/272053191ddd.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2322,
        'name_cn': '彩虹6号',
        'name_en': '',
        'logo': 'https://img.avia01.com/upload/201809/20054505c9bb.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2948,
        'name_cn': '神器',
        'name_en': '神器',
        'logo': 'https://img.avia01.com/upload/201811/302051030eec.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2661,
        'name_cn': '梦三国2',
        'name_en': '',
        'logo': 'https://img.avia01.com/upload/201809/09224516d4cf.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2653,
        'name_cn': '皇室战争',
        'name_en': '皇室战争',
        'logo': 'https://img.avia01.com/upload/201809/080140423c5e.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2776,
        'name_cn': '雷神之锤',
        'name_en': '雷神之锤',
        'logo': 'https://img.avia01.com/upload/201810/07211816277a.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2867,
        'name_cn': '魔兽世界',
        'name_en': '魔兽世界',
        'logo': 'https://img.avia01.com/upload/201810/29205100ba64.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }, {
        'game_id': 2106,
        'name_cn': '使命召唤',
        'name_en': '',
        'logo': 'https://img.avia01.com/upload/201805/17155005d77f.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      },  {
        'game_id': 2920,
        'name_cn': '地下城与勇士',
        'name_en': 'DNF',
        'logo': 'https://img.avia01.com/upload/201811/151359553297.png',
        'match_count': 12,
        'enable': true,
        'sort':1
      }
    ]
        })
      }, 1000)}
}
