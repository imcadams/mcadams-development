function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var canonicalHost = 'www.mcadamsdevelopment.com';
  var host = headers.host && headers.host.value;

  if (host && host !== canonicalHost) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + canonicalHost + request.uri },
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
        location: { value: 'https://' + canonicalHost + uri.slice(0, -1) },
      },
    };
  }

  if (!uri.includes('.')) {
    request.uri = uri + '/index.html';
  }

  return request;
}
