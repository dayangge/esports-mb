export default {
  'GET /api/runningAccount':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            'code': 0,
            'msg': '8ms',
            'data': {
              'RecordCount': 23,
              'PageIndex': 2,
              'PageSize': 15,
              'data': null,
              'list': [
                {
                  'ID': '1',
                'UserID': '2588789',
                'CreateAt': '2019/6/19 17:20:34',
                'Balance': '30.0000',
                'Money': '-10.0000',
                'Type': '投注',
                'Description': '订单编号:3122936',
              }, {
                  'ID': '2',
                'UserID': '2588789',
                'CreateAt': '2019/6/19 17:20:34',
                'Balance': '40.0000',
                'Money': '-10.0000',
                'Type': '投注',
                'Description': '订单编号:3122935',
              }, {
                  'ID': '3',
                'UserID': '2588789',
                'CreateAt': '2019/6/19 17:14:59',
                'Balance': '50.0000',
                'Money': '-10.0000',
                'Type': '投注',
                'Description': '订单编号:3122766',
              }, {
                  'ID': '4',
                'UserID': '2588789',
                'CreateAt': '2019/6/19 17:14:58',
                'Balance': '60.0000',
                'Money': '-10.0000',
                'Type': '投注',
                'Description': '订单编号:3122765',
              }, {
                  'ID': '5',
                'UserID': '2588789',
                'CreateAt': '2019/6/19 17:05:23',
                'Balance': '70.0000',
                'Money': '-10.0000',
                'Type': '投注',
                'Description': '订单编号:3122455',
              }, {
                  'ID': '6',
                'UserID': '2588789',
                'CreateAt': '2019/6/19 17:05:20',
                'Balance': '70.0000',
                'Money': '-10.0000',
                'Type': '投注',
                'Description': '订单编号:3122456',
              }, {
                  'ID': '7',
                'UserID': '2588789',
                'CreateAt': '2019/6/19 17:04:34',
                'Balance': '90.0000',
                'Money': '-10.0000',
                'Type': '投注',
                'Description': '订单编号:3122412',
              }, {
                  'ID': '8',
                'UserID': '2588789',
                'CreateAt': '2019/6/19 17:03:35',
                'Balance': '100.0000',
                'Money': '100.0000',
                'Type': '转入',
                'Description': '转入',
              }],
            },
          },
        );
      }, 2000);
    },

};
