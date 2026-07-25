function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var canonicalHost = 'www.mcadamsdevelopment.com';
  var host = headers.host && headers.host.value;

  function querySuffix(querystring) {
    var parts = [];

    for (var key in querystring) {
      if (!Object.prototype.hasOwnProperty.call(querystring, key)) {
        continue;
      }

      var parameter = querystring[key];
      if (parameter.multiValue) {
        for (var i = 0; i < parameter.multiValue.length; i++) {
          var value = parameter.multiValue[i].value;
          parts.push(key + (value ? '=' + value : ''));
        }
      } else {
        parts.push(key + (parameter.value ? '=' + parameter.value : ''));
      }
    }

    return parts.length ? '?' + parts.join('&') : '';
  }

  var query = querySuffix(request.querystring);

  if (host && host !== canonicalHost) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + canonicalHost + request.uri + query },
      },
    };
  }

  var uri = request.uri;
  if (uri === '/') {
    request.uri = '/index.html';
    return request;
  }

  if (uri.endsWith('/')) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + canonicalHost + uri.slice(0, -1) + query },
      },
    };
  }

  if (!uri.includes('.')) {
    request.uri = uri + '/index.html';
  }

  return request;
}
