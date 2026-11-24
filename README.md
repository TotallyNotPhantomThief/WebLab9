200 list with a combination of at least two query parameters

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 85
ETag: W/"55-dZb4oj73PnFRq3EK4p/iqiP9B0c"
Date: Tue, 24 Nov 2026 15:44:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Genre must be one of : Fantasy,Fiction,DNon-Fiction,History,Science,Other"}

200: tek kitap
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 115
ETag: W/"73-jLFD9HzMkHi9mAhVJTJW3Qy4dsE"
Date: Tue, 24 Nov 2026 15:44:51 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":1,"title":"Lord of the Rings","author":"J.R.R. Tolkien","year":1954,"genre":"Fantasy","read":true,"rating":5}
400 for an invalid body
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 30
ETag: W/"1e-DAdkm4xK19ISTDqj5X0ReHrnZtk"
Date: Tue, 24 Nov 2026 15:45:47 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Somting went wrong"}

400 for a repeated query parameter
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 36
ETag: W/"24-o/V+dBqlrS419S6MubtLJjSUfy0"
Date: Tue, 24 Nov 2026 15:47:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"query cannot be repeated"}

404 for a missing book
HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 32
ETag: W/"20-zIygzS3Hdi5lOqg1qB/BNPo2FH8"
Date: Tue, 24 Nov 2026 15:48:24 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"No book with that id"}

204 for a delete

HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 34
ETag: W/"22-tiyyouwlttmxazg+E1SHUAPSvTE"
Date: Tue, 24 Nov 2026 15:49:50 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"No book like that here"}

followed by a 404 for the same delete repeated




README: Reasoning Questions


























4.
Put is better used where chaning the whole item instead of little things where Patch is better used for little change.







6.
If the page were opened directly from disk, its origin would be file://, so a
relative URL like /api/books would resolve to file:///api/books, which does not
exist, and nothing would reach the API.


7.
It got reseted.