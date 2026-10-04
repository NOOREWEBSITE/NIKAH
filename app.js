// ===============================
// NIKAH MATCH - SUPABASE CONNECT
// ===============================

const SUPABASE_URL ="https://nmrzbkgnvqukzfgtcfum.supabase.co/";
const SUPABASE_KEY ="sb_publishable_9MVYA9UP2jn-22cnXePMqw_NSpx0kT5";

// Load Supabase library
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
script.onload = startNikahApp;
document.head.appendChild(script);

function startNikahApp() {
  const { createClient } = window.supabase;
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const registrationForm = document.getElementById("registrationForm");
  const message = document.getElementById("formMessage");

  // ===============================
  // REGISTRATION
  // ===============================
  if (registrationForm) {
    registrationForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      message.textContent = "Creating your account...";

      const formData = new FormData(registrationForm);

      const email = formData.get("email");
      const password = formData.get("password");

      if (!email || !password) {
        message.textContent = "Email and password are required.";
        return;
      }

      const profile = {
        full_name: formData.get("name"),
        gender: formData.get("gender"),
        dob: formData.get("dob"),
        city: formData.get("city"),
        education: formData.get("education"),
        profession: formData.get("profession"),
        height: formData.get("height"),
        marital_status: formData.get("marital_status"),
        family_info: formData.get("family_info"),
        preferences: formData.get("preferences"),
        email: email
      };

      // Save profile temporarily until email confirmation
      localStorage.setItem(
        "nikah_pending_profile",
        JSON.stringify(profile)
      );

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });

      if (error) {
        message.textContent = error.message;
        return;
      }

      // If Supabase gives us a session immediately
      if (data.session && data.user) {
        await saveProfile(data.user);
      } else {
        message.textContent =
          "Account created. Please check your email and confirm your email address, then login.";
      }
    });
  }

  // ===============================
  // SAVE PROFILE
  // ===============================
  async function saveProfile(user) {
    const saved = localStorage.getItem("nikah_pending_profile");

    if (!saved) {
      return;
    }

    const profile = JSON.parse(saved);

    const { error } = await supabase
      .from("users")
      .insert({
        auth_user_id: user.id,
        full_name: profile.full_name,
        gender: profile.gender,
        dob: profile.dob,
        city: profile.city,
        education: profile.education,
        profession: profile.profession,
        height: profile.height,
        marital_status: profile.marital_status,
        family_info: profile.family_info,
        preferences: profile.preferences,
        email: profile.email,
        status: "pending_payment"
      });

    if (error) {
      console.error(error);
      alert("Account created, but profile could not be saved yet.");
      return;
    }

    localStorage.removeItem("nikah_pending_profile");

    alert(
      "Your profile has been created successfully. Payment verification will be added next."
    );

    if (registrationForm) {
      registrationForm.reset();
    }
  }

  // ===============================
  // LOGIN
  // ===============================
  const loginBox = document.querySelector(".login-box");

  if (loginBox) {
    const inputs = loginBox.querySelectorAll("input");
    const loginButton = loginBox.querySelector("button");

    if (inputs.length >= 2 && loginButton) {
      loginButton.addEventListener("click", async function () {
        const email = inputs[0].value.trim();
        const password = inputs[1].value;

        if (!email || !password) {
          alert("Please enter email and password.");
          return;
        }

        loginButton.textContent = "Logging in...";
        loginButton.disabled = true;

        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          alert(error.message);
          loginButton.textContent = "Login";
          loginButton.disabled = false;
          return;
        }

        if (data.user) {
          await saveProfile(data.user);
        }

        alert("Login successful.");

        loginButton.textContent = "Logged in";
      });
    }
  }
}
