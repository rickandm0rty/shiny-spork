ConvertFrom-StringData @'
EditorCommandExists=Editor command '{0}' already exists, skipping.
EditorCommandImporting=Importing editor command '{0}'.
MissingEditorContext=Unable to obtain editor context. Make sure PowerShell Editor Services is running and then try the command again.
'@

# SIG # Begin signature block
# MIIdhgYJKoZIhvcNAQcCoIIddzCCHXMCAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQU6UTkTAjOHDQ4slnGt3Qs46pu
# eBmgghhUMIIEwjCCA6qgAwIBAgITMwAAALu2dyRxSiAAIAAAAAAAuzANBgkqhkiG
# 9w0BAQUFADB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
# A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEw
# HwYDVQQDExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EwHhcNMTYwOTA3MTc1ODQ3
# WhcNMTgwOTA3MTc1ODQ3WjCBsjELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
# bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
# b3JhdGlvbjEMMAoGA1UECxMDQU9DMScwJQYDVQQLEx5uQ2lwaGVyIERTRSBFU046
# MERFOC0yREM1LTNDQTkxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNl
# cnZpY2UwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC48+U38sLxQNu8
# OO1wnT9mKeHv+f/jxafTFXzx9VF59IK/n/jLv4HIXt8ucy3KjBTM5Jf6D0nQlI4h
# Sizjrn6lO61q+V8oZiYYhjgR258rg8MDIrPpZMxK6OmD0d1wtksHW1cG21YKg5jg
# idT2hmQBpiL9Cra3ccY5keu0kl6OfZFoj4DF0i0JRVFSy1C9gKP4H950XIjlA2Yo
# TWN0LuHEHYMvwD1mOpAq2dVwPZh6xeNnpV8U/qLneyb9I/SqY/87tsZCn4FH7R3x
# 0TgK2eRwpWXfwGbUb1R/UTLd20aQ+my4NWwSsndeG+0vsYwaF40heB2lo1ThmByr
# OTBmEosTAgMBAAGjggEJMIIBBTAdBgNVHQ4EFgQUj9yNX+4+R8GZ7rcy4MdnJHXO
# KkswHwYDVR0jBBgwFoAUIzT42VJGcArtQPt2+7MrsMM1sw8wVAYDVR0fBE0wSzBJ
# oEegRYZDaHR0cDovL2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMv
# TWljcm9zb2Z0VGltZVN0YW1wUENBLmNybDBYBggrBgEFBQcBAQRMMEowSAYIKwYB
# BQUHMAKGPGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMvTWljcm9z
# b2Z0VGltZVN0YW1wUENBLmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDANBgkqhkiG
# 9w0BAQUFAAOCAQEAcMI8Q0PxQVvxZSD1fjszuD6VF/qPZjKZj9WLTjWjZT2k9lzG
# yvSL7vy9J7lnyMATrbm5ptqAfdonNygLaBm05MnrIvgPJYK89wyTIyS1u71ro7z+
# EVrGPaKZiD+WvH8SWP+OWZQNf55fEL8tZo+a1oHm3lUARi5rR916OQvb4UnCENyV
# g8IfmupnwpxHcmIBUWZtTKAuKmuX/c8G2z4KJ8WhruYjPDWYQXJrQ5t7PhZa19Ge
# kOOtigge9EKIAWhZUJkw9fnfRm2IFX0gWtOzRXVNhR109ISacbNxd0oUboRYHmlq
# wGrOz64/3SDdOeN7PjvLwFmThuoXIsxrjQD8ODCCBgEwggPpoAMCAQICEzMAAADE
# 6Yn4eoFQ6f8AAAAAAMQwDQYJKoZIhvcNAQELBQAwfjELMAkGA1UEBhMCVVMxEzAR
# BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
# Y3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0IENvZGUgU2ln
# bmluZyBQQ0EgMjAxMTAeFw0xNzA4MTEyMDIwMjRaFw0xODA4MTEyMDIwMjRaMHQx
# CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
# b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xHjAcBgNVBAMTFU1p
# Y3Jvc29mdCBDb3Jwb3JhdGlvbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
# ggEBAIiKuCTDB4+agHkV/CZg/HKILPr0o5eIlka3o8tfiS86My4ekXj6fKkfggG1
# essavAPKRuvFmff7BB3yhQr/Im6h8mc9xScY5Sgf9QSUQWPs47oVjO0TmjXeOHBU
# bzvsrUUJMEnBvo8wmQzLdsn3c5UWd9GLu5THCIUg7R6oNfFxwuB0AEuK0tyR69Z4
# /o36rWCIPb25H65il7/FhLGQrtavK9NU+zXazXGS5h7/7HFry38IdnTgEFFI1PEA
# yEhMowc15VkN/XycyOZa44X11poPH46m5IQXwdbKnx0Bx/1IpxOSM5chSDL4wiSi
# ALK+U8qDbilbge84boDzu+wTC+sCAwEAAaOCAYAwggF8MB8GA1UdJQQYMBYGCisG
# AQQBgjdMCAEGCCsGAQUFBwMDMB0GA1UdDgQWBBTL1mKEz2A56v9nwlzSyLurt8MT
# mDBSBgNVHREESzBJpEcwRTENMAsGA1UECxMETU9QUjE0MDIGA1UEBRMrMjMwMDEy
# K2M4MDRiNWVhLTQ5YjQtNDIzOC04MzYyLWQ4NTFmYTIyNTRmYzAfBgNVHSMEGDAW
# gBRIbmTlUAXTgqoXNzcitW2oynUClTBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
# d3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NybC9NaWNDb2RTaWdQQ0EyMDExXzIw
# MTEtMDctMDguY3JsMGEGCCsGAQUFBwEBBFUwUzBRBggrBgEFBQcwAoZFaHR0cDov
# L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDEx
# XzIwMTEtMDctMDguY3J0MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQELBQADggIB
# AAYWH9tXwlDII0+iUXjX7fj9zb3VwPH5G1btU8hpRwXVxMvs4vyZW5VfETgowAVF
# E+CaeYi8Zqvbu+sCVSO3PSN4QW2u+PEAWpSZihzMCZXQmhxEMKmlFse6R1v1KzSL
# n49YN8NOHK8iyhDN2IIQqTXwriLIjySmgYvfJxzkZh2JPi7/VwNNwW6DoDLrtLMv
# UFZdBrEVjMgdY7dzDOPWeiYPKpZFpzKDPpY+V0l3I4n+sRDHiuUIFVHFK1oxWzlq
# lqikiGuWKG/xxK7qvUUXzGJOgbVUGkeOmKVtwG4nxvgnH8jtIKkLsfHOC5qU4mqd
# aYOhNtdtIP6F1f/DuJc2Cf49FMGYFKnAhszvgsGrVSRDGLVIhXiG0PnSnT8Z2RSJ
# 542faCSIaDupx4BOJucIIUxj/ZyTFU0ztVZgT9dKuTiO/y7dsV+kQ2vJeM+xu2uP
# g2yHcqrqpfuf3RrWOfxkyW0+COV8g7GtvKO6e8+WVqR6WMsSR2LSIe/8PMQxC/cv
# PmSlN29gUD+3RJBPoAuLvn5Y9sdnh2HbnpjEyIzLb0fhwC6U7bH2sDBt7GpJqOmW
# dsi9CMT+O/WuczcGslbPGdS79ZTKhxzygGoBT7YbgXOz01siPzpYGN+I7mfESacv
# 3CWLPV7Q7DREkR28kQx2gj7vxNgtoQQCjkj5790CzwOiMIIGBzCCA++gAwIBAgIK
# YRZoNAAAAAAAHDANBgkqhkiG9w0BAQUFADBfMRMwEQYKCZImiZPyLGQBGRYDY29t
# MRkwFwYKCZImiZPyLGQBGRYJbWljcm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQg
# Um9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1MzA5WhcNMjEw
# NDAzMTMwMzA5WjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
# MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
# MSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EwggEiMA0GCSqGSIb3
# DQEBAQUAA4IBDwAwggEKAoIBAQCfoWyx39tIkip8ay4Z4b3i48WZUSNQrc7dGE4k
# D+7Rp9FMrXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr6Hu97IkHD/cOBJjwicwfyzMk
# h53y9GccLPx754gd6udOo6HBI1PKjfpFzwnQXq/QsEIEovmmbJNn1yjcRlOwhtDl
# KEYuJ6yGT1VSDOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd++NIT8wi3U21StEWQn0gA
# SkdmEScpZqiX5NMGgUqi+YSnEUcUCYKfhO1VeP4Bmh1QCIUAEDBG7bfeI0a7xC1U
# n68eeEExd8yb3zuDk6FhArUdDbH895uyAc4iS1T/+QXDwiALAgMBAAGjggGrMIIB
# pzAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQjNPjZUkZwCu1A+3b7syuwwzWz
# DzALBgNVHQ8EBAMCAYYwEAYJKwYBBAGCNxUBBAMCAQAwgZgGA1UdIwSBkDCBjYAU
# DqyCYEBWJ5flJRP8KuEKU5VZ5KShY6RhMF8xEzARBgoJkiaJk/IsZAEZFgNjb20x
# GTAXBgoJkiaJk/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jvc29mdCBS
# b290IENlcnRpZmljYXRlIEF1dGhvcml0eYIQea0WoUqgpa1Mc1j0BxMuZTBQBgNV
# HR8ESTBHMEWgQ6BBhj9odHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9w
# cm9kdWN0cy9taWNyb3NvZnRyb290Y2VydC5jcmwwVAYIKwYBBQUHAQEESDBGMEQG
# CCsGAQUFBzAChjhodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
# Y3Jvc29mdFJvb3RDZXJ0LmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDANBgkqhkiG
# 9w0BAQUFAAOCAgEAEJeKw1wDRDbd6bStd9vOeVFNAbEudHFbbQwTq86+e4+4LtQS
# ooxtYrhXAstOIBNQmd16QOJXu69YmhzhHQGGrLt48ovQ7DsB7uK+jwoFyI1I4vBT
# Fd1Pq5Lk541q1YDB5pTyBi+FA+mRKiQicPv2/OR4mS4N9wficLwYTp2Oawpylbih
# OZxnLcVRDupiXD8WmIsgP+IHGjL5zDFKdjE9K3ILyOpwPf+FChPfwgphjvDXuBfr
# Tot/xTUrXqO/67x9C0J71FNyIe4wyrt4ZVxbARcKFA7S2hSY9Ty5ZlizLS/n+YWG
# zFFW6J1wlGysOUzU9nm/qhh6YinvopspNAZ3GmLJPR5tH4LwC8csu89Ds+X57H21
# 46SodDW4TsVxIxImdgs8UoxxWkZDFLyzs7BNZ8ifQv+AeSGAnhUwZuhCEl4ayJ4i
# IdBD6Svpu/RIzCzU2DKATCYqSCRfWupW76bemZ3KOm+9gSd0BhHudiG/m4LBJ1S2
# sWo9iaF2YbRuoROmv6pH8BJv/YoybLL+31HIjCPJZr2dHYcSZAI9La9Zj7jkIeW1
# sMpjtHhUBdRBLlCslLCleKuzoJZ1GtmShxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/J
# mu5J4PcBZW+JC33Iacjmbuqnl84xKf8OxVtc2E0bodj6L54/LlUWa8kTo/0wggd6
# MIIFYqADAgECAgphDpDSAAAAAAADMA0GCSqGSIb3DQEBCwUAMIGIMQswCQYDVQQG
# EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
# A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylNaWNyb3NvZnQg
# Um9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkgMjAxMTAeFw0xMTA3MDgyMDU5MDla
# Fw0yNjA3MDgyMTA5MDlaMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
# dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
# YXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENBIDIwMTEw
# ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCr8PpyEBwurdhuqoIQTTS6
# 8rZYIZ9CGypr6VpQqrgGOBoESbp/wwwe3TdrxhLYC/A4wpkGsMg51QEUMULTiQ15
# ZId+lGAkbK+eSZzpaF7S35tTsgosw6/ZqSuuegmv15ZZymAaBelmdugyUiYSL+er
# CFDPs0S3XdjELgN1q2jzy23zOlyhFvRGuuA4ZKxuZDV4pqBjDy3TQJP4494HDdVc
# eaVJKecNvqATd76UPe/74ytaEB9NViiienLgEjq3SV7Y7e1DkYPZe7J7hhvZPrGM
# XeiJT4Qa8qEvWeSQOy2uM1jFtz7+MtOzAz2xsq+SOH7SnYAs9U5WkSE1JcM5bmR/
# U7qcD60ZI4TL9LoDho33X/DQUr+MlIe8wCF0JV8YKLbMJyg4JZg5SjbPfLGSrhwj
# p6lm7GEfauEoSZ1fiOIlXdMhSz5SxLVXPyQD8NF6Wy/VI+NwXQ9RRnez+ADhvKwC
# gl/bwBWzvRvUVUvnOaEP6SNJvBi4RHxF5MHDcnrgcuck379GmcXvwhxX24ON7E1J
# MKerjt/sW5+v/N2wZuLBl4F77dbtS+dJKacTKKanfWeA5opieF+yL4TXV5xcv3co
# KPHtbcMojyyPQDdPweGFRInECUzF1KVDL3SV9274eCBYLBNdYJWaPk8zhNqwiBfe
# nk70lrC8RqBsmNLg1oiMCwIDAQABo4IB7TCCAekwEAYJKwYBBAGCNxUBBAMCAQAw
# HQYDVR0OBBYEFEhuZOVQBdOCqhc3NyK1bajKdQKVMBkGCSsGAQQBgjcUAgQMHgoA
# UwB1AGIAQwBBMAsGA1UdDwQEAwIBhjAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQY
# MBaAFHItOgIxkEO5FAVO4eqnxzHRI4k0MFoGA1UdHwRTMFEwT6BNoEuGSWh0dHA6
# Ly9jcmwubWljcm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL01pY1Jvb0NlckF1
# dDIwMTFfMjAxMV8wM18yMi5jcmwwXgYIKwYBBQUHAQEEUjBQME4GCCsGAQUFBzAC
# hkJodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0NlckF1
# dDIwMTFfMjAxMV8wM18yMi5jcnQwgZ8GA1UdIASBlzCBlDCBkQYJKwYBBAGCNy4D
# MIGDMD8GCCsGAQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
# L2RvY3MvcHJpbWFyeWNwcy5odG0wQAYIKwYBBQUHAgIwNB4yIB0ATABlAGcAYQBs
# AF8AcABvAGwAaQBjAHkAXwBzAHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJKoZIhvcN
# AQELBQADggIBAGfyhqWY4FR5Gi7T2HRnIpsLlhHhY5KZQpZ90nkMkMFlXy4sPvjD
# ctFtg/6+P+gKyju/R6mj82nbY78iNaWXXWWEkH2LRlBV2AySfNIaSxzzPEKLUtCw
# /WvjPgcuKZvmPRul1LUdd5Q54ulkyUQ9eHoj8xN9ppB0g430yyYCRirCihC7pKkF
# DJvtaPpoLpWgKj8qa1hJYx8JaW5amJbkg/TAj/NGK978O9C9Ne9uJa7lryft0N3z
# Dq+ZKJeYTQ49C/IIidYfwzIY4vDFLc5bnrRJOQrGCsLGra7lstnbFYhRRVg4MnEn
# Gn+x9Cf43iw6IGmYslmJaG5vp7d0w0AFBqYBKig+gj8TTWYLwLNN9eGPfxxvFX1F
# p3blQCplo8NdUmKGwx1jNpeG39rz+PIWoZon4c2ll9DuXWNB41sHnIc+BncG0Qax
# dR8UvmFhtfDcxhsEvt9Bxw4o7t5lL+yX9qFcltgA1qFGvVnzl6UJS0gQmYAf0AAp
# xbGbpT9Fdx41xtKiop96eiL6SJUfq/tHI4D1nvi/a7dLl+LrdXga7Oo3mXkYS//W
# syNodeav+vyL6wuA6mk7r/ww7QRMjt/fdW1jkT3RnVZOT7+AVyKheBEyIXrvQQqx
# P/uozKRdwaGIm1dxVk5IRcBCyZt2WwqASGv9eZ/BvW1taslScxMNelDNMYIEnDCC
# BJgCAQEwgZUwfjELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
# BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEo
# MCYGA1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EgMjAxMQITMwAAAMTp
# ifh6gVDp/wAAAAAAxDAJBgUrDgMCGgUAoIGwMBkGCSqGSIb3DQEJAzEMBgorBgEE
# AYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMCMGCSqGSIb3DQEJ
# BDEWBBRkj7wZGO3SltmoIiMgSPze6PpDgzBQBgorBgEEAYI3AgEMMUIwQKAWgBQA
# UABvAHcAZQByAFMAaABlAGwAbKEmgCRodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
# UG93ZXJTaGVsbCAwDQYJKoZIhvcNAQEBBQAEggEABdn1RqyCd3sU264g6/h1rJne
# srg7qOfMBmKjB4aZPmF9TDFpvA6onRjBAor+KDHp7ZbeIIWYZFEwn63b2a9iW8SQ
# eK3e0rxpeswbZnITb5RAWQjhLBtfDNgXj9n5aLG+kMBRkjIIq81Np1Ful7r4XL+9
# ctTDleJry33Q3z4StggEybGH6e4phknOnykAC55oB2tbWeL6WFF8/bJbPPB0jq+K
# Fp95fF6GJ82f27t5n6o4SnGTN3l4lBcAvapENQxIJ2IV0YEG54X0A3PXX/h93C2f
# beOTb369ICS2Wab9rJU/fXx+Vq2O/XdSlSTR8tipx/wjVWn8dZUkA1unGiAbfqGC
# AigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQswCQYDVQQGEwJVUzET
# MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
# TWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
# dGFtcCBQQ0ECEzMAAAC7tnckcUogACAAAAAAALswCQYFKw4DAhoFAKBdMBgGCSqG
# SIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE4MDQyNjE3NDQx
# NFowIwYJKoZIhvcNAQkEMRYEFDiU51mwvRRAu7Z2pYhRiyH8idpLMA0GCSqGSIb3
# DQEBBQUABIIBAJAzKK3b0Z7g3VVYgnfEDhP7jeVWYmd35Du/rKBWONehQ6AdDvJo
# LgdMKxxRN9vgloFXF74K1wClgV7kKz5tXvkpVFU4ridsovdsLFqmZfd+Hh7a96pT
# mIkkHnlcZ5u9Hg+BWLsQ3pbEF0EaSN2BUx/ESA59cxSCO4rXXaG0Oc5k7p2eT3he
# hoxdkof3RnfMcZra/7XK+zcjzdQIfUj/L5seB30BrKYWPJ/L8K+choC9fK7jVmNp
# PHLp1aNqf0MgCXvAOKyIGl6ZwJ08ubJLXN/Fc4xCUdjKD95N9jT7W8prf7PqSoiL
# H+1AHftUwXYm36OCc6b9CwXjTKE4OpUQgv8=
# SIG # End signature block
