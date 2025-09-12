const domainName = window.location.hostname;
let ctx;
if(domainName.startsWith('localhost') || domainName.startsWith('127.0.0.1')) {
  ctx = 'http://localhost:8000';
} else if(domainName.startsWith('marvelous-twilight-b67362.netlify.app') || 
        domainName.startsWith('www.marvelous-twilight-b67362.netlify.app')){
  ctx = 'https://haruhana-stamp.com';
}

function showAlert(message, callbackFc = hideAlert) {
  const modal = document.getElementById("alert-modal");
  const msg = document.getElementById("alert-message");
  const closeBtn = document.getElementById("alert-close");
  msg.textContent = message;
  modal.style.display = "flex";
  closeBtn.onclick = callbackFc;
}

function hideAlert() {
  const modal = document.getElementById("alert-modal");
  modal.style.display = "none";
}

  // 이메일 유효성 검사
function validateEmail(email) {
  return /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
}

async function apiFetch(url, optionsParam = {}) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    location.href = './login.html';
    return;
  }

  // 파라미터 세팅 (method, headers, data)
  let method = optionsParam.method ?? 'GET';
  let headers = {
    ...optionsParam.headers,
    'Authorization': 'Bearer ' + token
  };
  let body = optionsParam.body ?? null;

  // POST, PUT, DELETE → body와 Content-Type 추가
  let options = {
    method: method,
    headers: headers,
    body: body
  };
  if (body && ['POST', 'PUT', 'DELETE'].includes(method)) {
    if (!headers['Content-Type']){
      headers['Content-Type'] = 'application/json; charset=UTF-8';
    }
  }
  
  return fetch(url, options)
    .then(async res => {
      // 네트워크 오류 처리
      // 서버에서 무조건 200을 던져주고, json으로 상태를 알려줌 
      // 예시: { "code": 401, "message": "Not authenticated" }
      const json = await res.json();

      if(json.code && json.code === 401) {
        const refresh = localStorage.getItem("refresh_token");
        const refreshFormData = new FormData();
        refreshFormData.append("refresh_token", refresh);
        
        const refreshRes = await fetch(`${ctx}/login/refresh`, {
          method: "POST",
          body: refreshFormData
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem("access_token", data.access_token);

          // ✅ 새로운 토큰으로 headers 업데이트
          headers = {
            ...headers,
            Authorization: `Bearer ${data.access_token}`
          };
          options.headers = headers;

          res = await fetch(url, options);
          return await res.json();
        } else {
          // Refresh도 만료 → 로그인 화면으로 이동
          localStorage.clear();
          showAlert("세션 만료. 다시 로그인해주세요.", () => {window.location.href = "/login.html";});
          return;
        }
      }

      return json;
  });
}

async function formFetch(url, optionsParam = {}) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    location.href = './login.html';
    return;
  }

  // 파라미터 세팅 (method, headers, data)
  let method = optionsParam.method ?? 'GET';
  let headers = {
    ...optionsParam.headers,
    'Authorization': 'Bearer ' + token
  };
  let body = optionsParam.body ?? null;

  // POST, PUT, DELETE → body와 Content-Type 추가
  let options = {
    method: method,
    headers: headers,
    body: body
  };
  
  return fetch(url, options)
    .then(async res => {
      // 네트워크 오류 처리
      // 서버에서 무조건 200을 던져주고, json으로 상태를 알려줌 
      // 예시: { "code": 401, "message": "Not authenticated" }
      const json = await res.json();

      if(json.code && json.code === 401) {
        const refresh = localStorage.getItem("refresh_token");
        const refreshFormData = new FormData();
        refreshFormData.append("refresh_token", refresh);

        const refreshRes = await fetch(`${ctx}/login/refresh`, {
          method: "POST",
          body: refreshFormData
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem("access_token", data.access_token);

          // ✅ 새로운 토큰으로 headers 업데이트
          headers = {
            ...headers,
            Authorization: `Bearer ${data.access_token}`
          };
          options.headers = headers;

          res = await fetch(url, options);
          return await res.json();
        } else {
          // Refresh도 만료 → 로그인 화면으로 이동
          localStorage.clear();
          showAlert("세션 만료. 다시 로그인해주세요.", () => {window.location.href = "/login.html";});
          return;
        }
      }

      return json;
  });
}