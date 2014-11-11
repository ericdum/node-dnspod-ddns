var request = require('request');
var os      = require('os');
var ifaces  = os.networkInterfaces();

var sub = process.argv[2];
var ip  = process.argv[3];

if( ! ip ) {
  for( var dev in ifaces ) {
    if( ip ) break;
    ifaces[dev].forEach(function(info) {
      if( info.internal ) return;
      if( info.family != 'IPv4' ) return;
      ip = info.address;
      return false;
    });
  }
}

var domains = {
  //subdomain: record_id, //从dnspod.cn页面源代码或请求获取
}
if( ! ( sub in domains ) ) return console.log( sub+'.qqyj.org', 'not found' );
var email = '';
var passw = '';

setInterval(update, 1*60*1000);
update();

function update(){
request.post('https://dnsapi.cn/Record.Info', function(err,httpResponse,body){
    var data = JSON.parse(body);
    console.log( data.record.sub_domain+'.qqyj.org', data.record.value );
    if( ip != data.record.value ){ 
      console.log( 'update', sub+'.qqyj.org', 'to', ip );
      request.post('https://dnsapi.cn/Record.Modify', function(err,httpResponse,body){
        var data = JSON.parse(body);
        console.log(data.status.message)
      }).form({
        login_email    : email,
        login_password : passw,
        format         : 'json',
        sub_domain     : data.record.sub_domain,
        record_type    : data.record.record_type,
        record_line    : data.record.record_line,
        value          : ip,
        domain_id      : 11524126,
        record_id      : domains[sub]
      });
    }
}).form({
  login_email    : email,
  login_password : passw,
  format         : 'json',
  domain_id      : 11524126,
  record_id      : domains[sub]
});
}
