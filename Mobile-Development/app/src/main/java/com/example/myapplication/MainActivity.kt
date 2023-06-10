package com.example.myapplication

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.WindowCompat
import com.example.myapplication.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding : ActivityMainBinding

    override fun onCreate(savedInstanceState : Bundle?) {
        super.onCreate(savedInstanceState)
        installSplashScreen()
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        WindowCompat.setDecorFitsSystemWindows(window , false)
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
        supportActionBar?.hide()

        if (!hasShownOnboarding()){
            startActivity(Intent(this@MainActivity, MainActivity::class.java))
        }else{
            startActivity(Intent(this@MainActivity, HomeActivity::class.java))
        }
        markOnboardingShown()

        val numberOfScreens = resources.getStringArray(R.array.on_boarding_titles).size
        val adapterOnboard = OnBoardingAdapter(this , numberOfScreens)
        binding.apply {
            onBoardingViewPager.isUserInputEnabled = false
            onBoardingViewPager.adapter = adapterOnboard
            dotsIndicator.attachTo(binding.onBoardingViewPager)

            materialButton2.setOnClickListener{
                val currentItem = onBoardingViewPager.currentItem
                if (currentItem < (onBoardingViewPager.adapter?.itemCount?.minus(1) ?: 0)) {
                    onBoardingViewPager.setCurrentItem(currentItem + 1, true)
                }else{
                    startActivity(Intent(this@MainActivity, HomeActivity::class.java))
                }
            }

            tvBackButton.setOnClickListener {
                val currentItems = onBoardingViewPager.currentItem
                if (currentItems > 0) {
                    onBoardingViewPager.setCurrentItem(currentItems - 1, true)
                }
            }

            tvSkipButton.setOnClickListener{
                val intent = Intent(this@MainActivity, HomeActivity::class.java)
                startActivity(intent)
            }
        }
    }

    private fun hasShownOnboarding(): Boolean {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getBoolean("hasShownOnboarding", false)
    }

    private fun markOnboardingShown() {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putBoolean("hasShownOnboarding", true)
        editor.apply()
    }

    companion object {
        private val TAG = MainActivity::class.java
    }
}