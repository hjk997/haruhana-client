function showAlert(message) {
  const modal = document.getElementById("alert-modal");
  const msg = document.getElementById("alert-message");
  msg.textContent = message;
  modal.style.display = "flex";
}

function hideAlert() {
  const modal = document.getElementById("alert-modal");
  modal.style.display = "none";
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
  let data = optionsParam.data ?? null;

  // POST, PUT, DELETE → body와 Content-Type 추가
  let options = {
    method: method,
    headers: headers
  };
  if (data && ['POST', 'PUT', 'DELETE'].includes(method)) {
    headers['Content-Type'] = 'application/json; charset=UTF-8';
    options.body = JSON.stringify(data);
  }
  
  let res = await fetch(url, options);

  // ❌ 토큰 만료
  if (res.status === 401) {
    const refresh = localStorage.getItem("refresh_token");
    const refreshRes = await fetch("/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh })
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
      showAlert("세션 만료. 다시 로그인해주세요.");
      window.location.href = "/login.html";
      return;
    }
  }

  return await res.json();
}
