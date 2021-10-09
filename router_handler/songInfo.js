const db = require('../db/index');

module.exports.iLikeInfo = (req, res) => {
  const sql = 'select * from i_like where is_delete=0 order by id asc';
  db.query(sql, (err, results) => {
      if (err) return res.errorR(1, '获取我喜欢歌曲信息失败！')
      res.send({ status: 0, message: '获取我喜欢歌曲信息成功！', data: results})
  });
};